export function truncateStringWithEllipsis(inputString:string, maxLength:number): string {
    if (inputString?.length <= maxLength) {
      return inputString;
    }
    
    return inputString?.slice(0, maxLength) + '...';
  }