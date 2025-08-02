// 虚拟键盘测试脚本
// 此脚本用于测试VirtualKeyboard组件的基本功能

// 等待页面加载完成
window.addEventListener('load', () => {
  console.log('开始测试虚拟键盘功能');

  // 检查页面元素是否存在
  const titleInput = document.getElementById('title');
  const contentInput = document.getElementById('content');
  const toggleButton = document.querySelector('button');
  const keyboardElement = document.querySelector('.fixed.bottom-0');

  if (!titleInput || !contentInput || !toggleButton || !keyboardElement) {
    console.error('测试失败: 无法找到必要的页面元素');
    return;
  }

  console.log('测试通过: 找到了所有必要的页面元素');

  // 测试键盘可见性切换
  console.log('测试键盘可见性切换...');
  let initialVisibility = keyboardElement.style.display !== 'none';
  toggleButton.click();
  let afterClickVisibility = keyboardElement.style.display !== 'none';

  if (initialVisibility !== afterClickVisibility) {
    console.log('测试通过: 键盘可见性切换功能正常');
  } else {
    console.error('测试失败: 键盘可见性切换功能异常');
  }

  // 恢复初始状态
  toggleButton.click();

  // 测试输入框聚焦
  console.log('测试输入框聚焦...');
  titleInput.focus();
  if (document.activeElement === titleInput) {
    console.log('测试通过: 标题输入框聚焦正常');
  } else {
    console.error('测试失败: 标题输入框聚焦异常');
  }

  // 测试虚拟键盘按键
  console.log('测试虚拟键盘按键...');
  const keyButtons = document.querySelectorAll('.fixed.bottom-0 button');
  const aKey = Array.from(keyButtons).find(btn => btn.textContent === 'a');
  const shiftKey = Array.from(keyButtons).find(btn => btn.textContent === '⇧');
  const spaceKey = Array.from(keyButtons).find(btn => btn.textContent === ' ');
  const backspaceKey = Array.from(keyButtons).find(btn => btn.textContent === 'Backspace');

  if (aKey && shiftKey && spaceKey && backspaceKey) {
    console.log('测试通过: 找到了所有测试按键');

    // 测试字母输入
    aKey.click();
    if (titleInput.value === 'a') {
      console.log('测试通过: 字母输入功能正常');
    } else {
      console.error('测试失败: 字母输入功能异常，预期: "a"，实际: "' + titleInput.value + '"');
    }

    // 测试Shift键切换大小写
    shiftKey.click();
    aKey.click();
    if (titleInput.value === 'aA') {
      console.log('测试通过: Shift键切换大小写功能正常');
    } else {
      console.error('测试失败: Shift键切换大小写功能异常，预期: "aA"，实际: "' + titleInput.value + '"');
    }

    // 测试空格键
    spaceKey.click();
    if (titleInput.value === 'aA ') {
      console.log('测试通过: 空格键功能正常');
    } else {
      console.error('测试失败: 空格键功能异常，预期: "aA "，实际: "' + titleInput.value + '"');
    }

    // 测试退格键
    backspaceKey.click();
    if (titleInput.value === 'aA') {
      console.log('测试通过: 退格键功能正常');
    } else {
      console.error('测试失败: 退格键功能异常，预期: "aA"，实际: "' + titleInput.value + '"');
    }

  } else {
    console.error('测试失败: 无法找到所有测试按键');
  }

  console.log('虚拟键盘功能测试完成');
});