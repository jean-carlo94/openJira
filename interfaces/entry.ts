
export interface Entry {
    _id: string;
    description: string;
    createdAt: number;
    status: string;
}

export type EntryEstatus = 'pending' | 'in-progress' | 'finished';