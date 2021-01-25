
interface IPost {
  cmd: string
  namespace: string
  args?: {}
}

function post(data: IPost) {
  return fetch('http://localhost:4242/api', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  }).then(res => {
    return res.json()
  }).then(data => {
    if ('error' in data) {
      return Promise.reject(data.error)
    }
    return data.data
  }).catch(err => {
    console.error(err)
  })
}

function promiseExisting(key, json: boolean = true) {
  const existing = localStorage.getItem('repositories')
  return existing ? Promise.resolve(json ? JSON.parse(existing) : existing) : null
}

function setJSON(key: string, data) {
  localStorage.setItem(key, JSON.stringify(data))
  return data
}

export function getRepositories() {
  return promiseExisting('repositories') || post({
    cmd: 'repositories',
    namespace: getCurrentNamespace(),
  }).then(res => setJSON('repositories', res))
}

export function getManifests(repo: string) {
  //TODO:: Add timeout here
  return post({
    cmd: 'show-manifests',
    namespace: getCurrentNamespace(),
    args: {
      repo
    }
  }).then(res => setJSON(repo, res))
}

export function setRepo(repo: string) {
  return setJSON('current_repository', repo)
}

export function getCurrentRepo() {
  const existing = localStorage.getItem('current_repository')
  return existing ? JSON.parse(existing) : null
}

export function getCurrentNamespace() {
  return localStorage.getItem('current_namespace')
}

export function setNamespace(namespace) {
  localStorage.setItem('current_namespace', namespace)
  return namespace
}


export default getRepositories