/* global chrome */

function applyI18n () {
  // 遍歷所有帶有 data-i18n 屬性的標籤
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n')
    const message = chrome.i18n.getMessage(key)
    if (message) {
      el.textContent = message
    }
  })
}

document.addEventListener('DOMContentLoaded', () => {
  applyI18n() // 優先翻譯介面
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
      saveBtn.innerText = chrome.i18n.getMessage('saveSuccess')
      setTimeout(() => {
        saveBtn.innerText = originalText
      }, 1500)
    })
  })
})
