// All the mode-switching takes place here, the other
// services just implement their functionality

export function handleModesSwitches(modesManager, event) {
    const key = event.key;
    if (key === 'm') {
      // Scrolling mode
      modesManager.deactivateAll();
      modesManager.activate(['scrolling_mode']);
    }
    if (key === 'n' || key === 'Escape' || key === 'Enter') {
      // Normal mode
      modesManager.deactivateAll();
      modesManager.activate(['normal_mode', 'cursor_movement']);
    }
    if (key === 'b') {
      modesManager.deactivateAll();
      modesManager.activate(['boxdraw_mode']);
    }
    if (key === 't') {
      modesManager.deactivateAll();
      modesManager.activate(['text_mode', 'cursor_movement']);
    }
}
