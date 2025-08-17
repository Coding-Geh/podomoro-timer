import { writable } from 'svelte/store';
import type { TimerState } from '$lib/types';

const initialState: TimerState = {
	timeLeft: 25 * 60, // 25 minutes in seconds
	totalTime: 25 * 60,
	isRunning: false,
	mode: 'focus',
	completedSessions: 0,
	totalFocusTime: 0,
	totalBreakTime: 0,
	todayFocus: 0,
	bestSession: 0,
	currentStreak: 0,
	lastSessionDate: null
};

function createTimerStore() {
	const { subscribe, set, update } = writable<TimerState>(initialState);
	let interval: NodeJS.Timeout | null = null;

	// Timer modes configuration
	const timerModes = {
		focus: { duration: 25 * 60, name: 'Focus', icon: '🍅', color: 'emerald' },
		shortBreak: { duration: 5 * 60, name: 'Short Break', icon: '☕', color: 'blue' },
		longBreak: { duration: 15 * 60, name: 'Long Break', icon: '🌴', color: 'purple' }
	};

	function start() {
		update(state => {
			if (!state.isRunning) {
				state.isRunning = true;
				state.timeLeft = state.totalTime;
				
				interval = setInterval(() => {
					update(s => {
						if (s.timeLeft > 0) {
							s.timeLeft--;
						} else {
							complete();
						}
						return s;
					});
				}, 1000);
			}
			return state;
		});
	}

	function pause() {
		update(state => {
			state.isRunning = false;
			if (interval) {
				clearInterval(interval);
				interval = null;
			}
			return state;
		});
	}

	function reset() {
		pause();
		update(state => {
			state.timeLeft = state.totalTime;
			return state;
		});
	}

	function setMode(mode: 'focus' | 'shortBreak' | 'longBreak') {
		pause();
		const modeConfig = timerModes[mode];
		update(state => {
			state.mode = mode;
			state.totalTime = modeConfig.duration;
			state.timeLeft = modeConfig.duration;
			return state;
		});
	}

	function setCustomTime(seconds: number) {
		pause();
		update(state => {
			state.mode = 'custom';
			state.totalTime = seconds;
			state.timeLeft = seconds;
			return state;
		});
	}

	function complete() {
		pause();
		update(state => {
			state.completedSessions++;
			
			// Update stats based on mode
			if (state.mode === 'focus') {
				state.totalFocusTime += state.totalTime;
				state.todayFocus += state.totalTime;
				state.bestSession = Math.max(state.bestSession, state.totalTime / 60);
				updateStreak(state);
			} else {
				state.totalBreakTime += state.totalTime;
			}
			
			return state;
		});
		
		saveToStorage();
		playNotification();
		
		// Auto-switch to next mode after 2 seconds
		setTimeout(() => {
			update(state => {
				if (state.mode === 'focus') {
					setMode('shortBreak');
				} else {
					setMode('focus');
				}
				return state;
			});
		}, 2000);
	}

	function updateStreak(state: TimerState) {
		const today = new Date().toDateString();
		if (state.lastSessionDate !== today) {
			if (state.lastSessionDate === new Date(Date.now() - 86400000).toDateString()) {
				state.currentStreak++;
			} else if (state.lastSessionDate !== today) {
				state.currentStreak = 1;
			}
			state.lastSessionDate = today;
		}
	}

	function playNotification() {
		// Simple notification sound using Web Audio API
		if (typeof window !== 'undefined' && 'AudioContext' in window) {
			const audioContext = new AudioContext();
			const oscillator = audioContext.createOscillator();
			const gainNode = audioContext.createGain();
			
			oscillator.connect(gainNode);
			gainNode.connect(audioContext.destination);
			
			oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
			gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
			
			oscillator.start(audioContext.currentTime);
			oscillator.stop(audioContext.currentTime + 0.5);
		}
		
		// Browser notification
		if ('Notification' in window && Notification.permission === 'granted') {
			new Notification('Pomodoro Timer', {
				body: 'Session completed! Time for a break.',
				icon: '/favicon.png'
			});
		}
	}

	function saveToStorage() {
		if (typeof window !== 'undefined') {
			update(state => {
				const data = {
					completedSessions: state.completedSessions,
					totalFocusTime: state.totalFocusTime,
					totalBreakTime: state.totalBreakTime,
					todayFocus: state.todayFocus,
					bestSession: state.bestSession,
					currentStreak: state.currentStreak,
					lastSessionDate: state.lastSessionDate
				};
				localStorage.setItem('pomodoroData', JSON.stringify(data));
				return state;
			});
		}
	}

	function loadFromStorage() {
		if (typeof window !== 'undefined') {
			const data = localStorage.getItem('pomodoroData');
			if (data) {
				const parsed = JSON.parse(data);
				update(state => {
					state.completedSessions = parsed.completedSessions || 0;
					state.totalFocusTime = parsed.totalFocusTime || 0;
					state.totalBreakTime = parsed.totalBreakTime || 0;
					state.todayFocus = parsed.todayFocus || 0;
					state.bestSession = parsed.bestSession || 0;
					state.currentStreak = parsed.currentStreak || 0;
					state.lastSessionDate = parsed.lastSessionDate;
					
					// Reset today's focus if it's a new day
					if (state.lastSessionDate !== new Date().toDateString()) {
						state.todayFocus = 0;
					}
					return state;
				});
			}
		}
	}

	return {
		subscribe,
		start,
		pause,
		reset,
		setMode,
		setCustomTime,
		complete,
		saveToStorage,
		loadFromStorage,
		timerModes
	};
}

export const timerStore = createTimerStore();
