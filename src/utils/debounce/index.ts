export function debounce(func: Function, delay: number) {
    let timeoutId: NodeJS.Timeout | null = null;

    return function (...args: any[]) {
      if (timeoutId) {
        clearTimeout(timeoutId); // Limpa o timeout se o usuário clicar várias vezes antes do delay
      }
      timeoutId = setTimeout(() => {
        func(...args); // Executa a função após o tempo de delay
      }, delay);
    };
  }