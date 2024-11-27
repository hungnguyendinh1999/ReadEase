export type VocabLevel = {
    level: string;
    instruction: string;
    level_tooltip: string;
};

export const vocabLevels: VocabLevel[] = [
    { level: "Default", instruction: "Use the same level of language as the input text.", level_tooltip: "Balanced and general audience." },
    { level: "ELI5", instruction: "Use the same level of language as eli5.", level_tooltip: "Simplest, child-friendly language." },
    { level: "Simple", instruction: "Use simple and easy-to-understand language.", level_tooltip: "Basic terms with some detail." },
    { level: "Intermediate", instruction: "Use moderately complex language for intermediate readers.", level_tooltip: "Moderate technical detail." },
    { level: "Advanced", instruction: "Use advanced language with technical details where appropriate.", level_tooltip: "Highly technical and detailed." },
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

/**
 * Helper function to get the tooltip for a given vocab level.
 * @param level - The vocab level.
 * @returns The tooltip for the vocab level.
 */
export const getTooltipForLevel = (level: string): string => {
    const vocabLevel = vocabLevels.find((v) => v.level === level);
    return vocabLevel?.level_tooltip || "No tooltip available for this level.";
};