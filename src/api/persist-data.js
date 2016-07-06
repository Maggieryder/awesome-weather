import $ from 'jquery'

export function setLocalDataArray (key, data){
  if ($.isArray(data)){
    localStorage.setItem(key, JSON.stringify(data))
    return data
  }
}

export function getLocalDataArray (key){
  let stringData = localStorage.getItem(key)
  let data = []

  try {
    data = JSON.parse(stringData)
  } catch (e) {
    console.log('bad data!')
  }

  return $.isArray(data) ? data : []
}

export function setLocalData (key, data){
    localStorage.setItem(key, data)
    return data
}

export function getLocalData (key){
  return localStorage.getItem(key)
}

export function removeLocalData (key){
  localStorage.removeItem(key)
}
