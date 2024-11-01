export function formatHashtags(array: string[]): string {
    if (array.length === 0) return '';
    return array.map(item => `#${item}`).join(' ');
}