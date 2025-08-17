export interface TimerState {
	timeLeft: number;
	totalTime: number;
	isRunning: boolean;
	mode: 'focus' | 'shortBreak' | 'longBreak' | 'custom';
	completedSessions: number;
	totalFocusTime: number;
	totalBreakTime: number;
	todayFocus: number;
	bestSession: number;
	currentStreak: number;
	lastSessionDate: string | null;
}

export interface Task {
	id: string;
	text: string;
	category: 'urgent' | 'important' | 'normal';
	completed: boolean;
	createdAt: string;
}

export interface TimerMode {
	name: string;
	duration: number;
	icon: string;
	color: string;
}

export interface Stats {
	completedSessions: number;
	totalFocusTime: number;
	totalBreakTime: number;
	todayFocus: number;
	bestSession: number;
	currentStreak: number;
	productivityScore: number;
}
