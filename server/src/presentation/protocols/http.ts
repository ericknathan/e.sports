export interface HttpResponse<BodyType = any> {
  statusCode: number;
  body: BodyType;
}

export interface HttpRequest<BodyType = any> {
  body?: BodyType;
  params?: any;
  user?: {
    id: string;
  }
}
