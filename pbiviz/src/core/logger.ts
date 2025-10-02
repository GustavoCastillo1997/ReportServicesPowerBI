export function log(logDiv: HTMLDivElement, message: string): void {
  const time = new Date().toLocaleTimeString();
  logDiv.textContent += `[${time}] ${message}\n`;
  logDiv.scrollTop = logDiv.scrollHeight;
}
