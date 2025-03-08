const COLORS = [
  "#E57373", // Red
  "#F06292", // Pink
  "#BA68C8", // Purple
  "#9575CD", // Deep Purple
  "#7986CB", // Indigo
  "#64B5F6", // Blue
  "#4FC3F7", // Light Blue
  "#4DD0E1", // Cyan
  "#4DB6AC", // Teal
  "#81C784", // Green
  "#AED581", // Light Green
  "#DCE775", // Lime
  "#FFD54F", // Amber
  "#FFB74D", // Orange
  "#FF8A65", // Deep Orange
];

export function generateRandomColor(): string {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}
