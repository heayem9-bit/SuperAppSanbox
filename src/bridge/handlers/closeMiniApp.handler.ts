export async function handleCloseMiniApp(onClose?: () => void): Promise<void> {
  if (onClose) {
    onClose();
  }
}