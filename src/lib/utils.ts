import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export enum Role {
	Admin = 'org:admin',
	Mentor = 'org:mentor',
	Applicant = 'org:applicant',
	Reference = 'org:reference',
}
