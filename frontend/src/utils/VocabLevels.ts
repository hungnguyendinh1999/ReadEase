export type VocabLevel = {
    level: string;
    instruction: string;
};

export const vocabLevels: VocabLevel[] = [
    { level: "Default", instruction: "Use the same level of language as the input text." },
    { level: "ELI5", instruction: "Use the same level of language as eli5." },
    { level: "Simple", instruction: "Use simple and easy-to-understand language." },
    { level: "Intermediate", instruction: "Use moderately complex language for intermediate readers." },
    { level: "Advanced", instruction: "Use advanced language with technical details where appropriate." },
];

/**
 * Helper function to get the instruction for a given vocab level.
 * @param level - The vocab level.
 * @returns The instruction for the vocab level.
 */
export const getInstructionForLevel = (level: string): string => {
    const vocabLevel = vocabLevels.find((v) => v.level === level);
    return vocabLevel?.instruction || "No instruction available for this level.";
};