
interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry{
    description: string,
    status: string,
    createdAt: number
}

export const seedData: SeedData = {
    entries: [
        {
            description: "Pendiente: Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
            status: 'pending',
            createdAt: Date.now()
         },
         {
            description: "En Progreo: nostrum exercitationem culpa vero in? Facilis sunt aliquid magni, ullam optio beatae!",
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
         },
         {
            description: "Finalizadas: vero in? Facilis sunt aliquid magni, ullam optio beatae!, amet consectetur adipisicing elit.",
            status: 'finished',
            createdAt: Date.now() - 1000000,
         }
    ]
}