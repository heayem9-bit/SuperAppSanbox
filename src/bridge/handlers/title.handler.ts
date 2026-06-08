import { SetBarTitleMessage } from '@/types/bridge.types';

export function handleSetBarTitle(
  message: SetBarTitleMessage,
  onSetBarTitle?: (title: string, bgColor: string, color: string, safeAreaColor: string) => void
): void {
  if (onSetBarTitle) {
    const { title, bgColor, color, safeAreaColor } = message.payload;
    onSetBarTitle(title, bgColor, color, safeAreaColor);
  }
}
