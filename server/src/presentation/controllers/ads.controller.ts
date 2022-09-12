import { Controller, HttpRequest, HttpResponse } from '../protocols';

export class AdsController implements Controller {
  handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return Promise.resolve({
      statusCode: 200,
      body: [
        { id: 1, name: 'Anúncio 1' },
        { id: 2, name: 'Anúncio 2' },
        { id: 3, name: 'Anúncio 3' },
      ],
    });
  }
};
