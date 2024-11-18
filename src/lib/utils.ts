
export const formatModelName = (name: string): string => {
    return name.length > 30 ? `${name.slice(0, 30)}...` : name;
  };
  
  export const generateYearRange = (startYear: number, endYear: number): number[] => {
    return Array.from(
      { length: endYear - startYear + 1 }, 
      (_, i) => startYear + i
    ).reverse();
  };
  