export enum ResponseContentType {
  Text = 'text',
  Json = 'json',
  ArrayBuffer = 'arraybuffer',
  Blob = 'blob'
}
//arraybuffer" | "blob" | "text" | "json"


export enum ContentType {
  NONE = 0,
  JSON = 1,
  FORM = 2,
  FORM_DATA = 3,
  TEXT = 4,
  BLOB = 5,
  ARRAY_BUFFER = 6
}


export enum ResponseType {
  Basic = 0,
  Cors = 1,
  Default = 2,
  Error = 3,
  Opaque = 4
}

export enum ReadyState {
  Unsent = 0,
  Open = 1,
  HeadersReceived = 2,
  Loading = 3,
  Done = 4,
  Cancelled = 5
}

export enum RequestMethod {
  Get = 0,
  Post = 1,
  Put = 2,
  Delete = 3,
  Options = 4,
  Head = 5,
  Patch = 6
}
