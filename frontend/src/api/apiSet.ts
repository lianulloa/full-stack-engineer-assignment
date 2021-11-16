import request from "../utils/request"

class ApiSet<T, CreateBody = Omit<T, "id">, EditBody = Partial<CreateBody>> {
  url: string
  constructor(url: string) {
    this.url = url + (url.endsWith('/') ? "" :"/")
  }

  list(query: any = null) {
    return request.get<T[]>(this.url, {
      params: query
    })
  }

  detail(id: string, query: any = null) {
    return request.get<T>(`${this.url}${id}`, {
      params: query
    })
  }

  create(body: CreateBody) {
    return request.post(this.url, body)
  }

  edit(id: string, body: EditBody) {
    return request.put(`${this.url}${id}`, body)
  }

  delete(id: string) {
    return request.delete(`${this.url}${id}`)
  }
}

export default ApiSet
