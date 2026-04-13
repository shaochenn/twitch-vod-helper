/* global chrome */

const saveBtn = document.getElementById('saveBtn')
saveBtn.addEventListener('click', () => {
  let value = parseInt(document.getElementById('seekAmount').value)

  // 基礎防呆邏輯
  if (isNaN(value) || value <= 0) {
    value = 5 // 回歸預設值
  } else if (value > 600) {
    value = 600 // 最大限制 10 分鐘
  }

  chrome.storage.sync.set({ seekTime: value }, () => {
    const originalText = saveBtn.innerText
    saveBtn.innerText = '✅ 已儲存'
    setTimeout(() => {
      saveBtn.innerText = originalText
    }, 1500)
  })
})
