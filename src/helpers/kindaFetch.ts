import Bluebird from 'bluebird';

export interface ITodoItem {
  id: number;
  completed: boolean;
  title: string;
}

export function kindaFetch(url: 'getList' | 'saveItem' | 'removeItem', data?: ITodoItem) {
  switch (url) {
    case 'getList':
      return emulateAsyncResponse(getList());
    case 'saveItem':
      return emulateAsyncResponse(saveItem(data as ITodoItem));
    case 'removeItem':
      return emulateAsyncResponse(removeItem(data as ITodoItem));
  }
}

async function emulateAsyncResponse<T>(data: T) {
  await Bluebird.delay(Math.random() * 1600 + 300);
  return data;
}

function getList(): ITodoItem[] {
  const raw = localStorage.getItem('todoList');
  let parsed: any;
  try {
    parsed = JSON.parse(raw || '');
    return parsed || [];
  } catch (err) {
    // empty/invalid value
  }
  return [];
}

function setList(list: ITodoItem[]) {
  localStorage.setItem('todoList', JSON.stringify(list));
  return true;
}

function saveItem(data: ITodoItem) {
  const list = getList();
  const existingIndex = list.findIndex(item => item.id === data.id);
  if (existingIndex > -1) {
    list[existingIndex] = data;
  } else {
    list.push(data);
  }
  setList(list);
  return true;
}

function removeItem(data: ITodoItem) {
  const list = getList();
  const existingIndex = list.findIndex(item => item.id === data.id);
  if (existingIndex > -1) {
    list.splice(existingIndex, 1);
    setList(list);
  }
  return true;
}
