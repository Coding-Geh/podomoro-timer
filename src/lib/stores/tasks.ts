import { writable } from 'svelte/store';
import type { Task } from '$lib/types';

function createTaskStore() {
	const { subscribe, set, update } = writable<Task[]>([]);

	function addTask(text: string, category: 'urgent' | 'important' | 'normal' = 'normal') {
		const task: Task = {
			id: Date.now().toString(),
			text: text.trim(),
			category,
			completed: false,
			createdAt: new Date().toISOString()
		};

		update(tasks => {
			tasks.push(task);
			return tasks;
		});

		saveToStorage();
	}

	function toggleTask(id: string) {
		update(tasks => {
			const task = tasks.find(t => t.id === id);
			if (task) {
				task.completed = !task.completed;
			}
			return tasks;
		});

		saveToStorage();
	}

	function deleteTask(id: string) {
		update(tasks => {
			return tasks.filter(t => t.id !== id);
		});

		saveToStorage();
	}

	function moveTask(fromId: string, toId: string) {
		update(tasks => {
			const fromIndex = tasks.findIndex(t => t.id === fromId);
			const toIndex = tasks.findIndex(t => t.id === toId);
			
			if (fromIndex !== -1 && toIndex !== -1) {
				const [movedTask] = tasks.splice(fromIndex, 1);
				tasks.splice(toIndex, 0, movedTask);
			}
			
			return tasks;
		});

		saveToStorage();
	}

	function clearCompleted() {
		update(tasks => {
			return tasks.filter(t => !t.completed);
		});

		saveToStorage();
	}

	function getStats() {
		let tasks: Task[] = [];
		subscribe(value => {
			tasks = value;
		})();

		const total = tasks.length;
		const completed = tasks.filter(t => t.completed).length;
		const pending = total - completed;
		const progress = total > 0 ? (completed / total) * 100 : 0;

		return {
			total,
			completed,
			pending,
			progress
		};
	}

	function saveToStorage() {
		if (typeof window !== 'undefined') {
			subscribe(tasks => {
				localStorage.setItem('pomodoroTasks', JSON.stringify(tasks));
			})();
		}
	}

	function loadFromStorage() {
		if (typeof window !== 'undefined') {
			const data = localStorage.getItem('pomodoroTasks');
			if (data) {
				try {
					const tasks = JSON.parse(data);
					set(tasks);
				} catch (error) {
					console.error('Error loading tasks from storage:', error);
					set([]);
				}
			}
		}
	}

	return {
		subscribe,
		addTask,
		toggleTask,
		deleteTask,
		moveTask,
		clearCompleted,
		getStats,
		saveToStorage,
		loadFromStorage
	};
}

export const taskStore = createTaskStore();
