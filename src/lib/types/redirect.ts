export interface Link {
	id: string;
	created_at: string;
	slug: string;
	url: string;
	title: string | null;
	active: boolean;
	clicks: number;
	creator_email: string | null;
}

// Alias untuk backward compatibility
export type Redirect = Link;
