import * as _superagent from 'superagent';
import * as superagentPromise from 'superagent-promise';

const corsProxy = 'https://crossorigin.me/';

const CONTENT_TYPE_HEADER = 'Content-Type';
const ACCEPT_HEADER = 'Accept';
const APPLICATION_JSON = 'application/json';

export default class Agent {
  static apiRoot: string =  `${corsProxy}http://orienteeringorganiser.com/api`;

  private superagent: _superagent.SuperAgent<_superagent.SuperAgentRequest>;

  constructor() {
    this.superagent = superagentPromise(_superagent, global.Promise);
  }

  protected async get(url: string) {
    const response = await this.superagent
    .get(`${Agent.apiRoot}${url}`)
    .set(CONTENT_TYPE_HEADER, APPLICATION_JSON)
    .set(ACCEPT_HEADER, APPLICATION_JSON)
    .end(this.handleErrors);

    return this.responseBody(response);
  }

  protected async put(url: string, body: string | object) {
    const response = await this.superagent
    .put(`${Agent.apiRoot}${url}`)
    .send(body)
    .set(CONTENT_TYPE_HEADER, APPLICATION_JSON)
    .set(ACCEPT_HEADER, APPLICATION_JSON)
    .end(this.handleErrors);

    return this.responseBody(response);
  }

  protected async post(url: string, body: string | object) {
    const response = await this.superagent
    .post(`${Agent.apiRoot}${url}`)
    .send(body)
    .set(CONTENT_TYPE_HEADER, APPLICATION_JSON)
    .set(ACCEPT_HEADER, APPLICATION_JSON)
    .end(this.handleErrors);

    return this.responseBody(response);
  }

  protected async delete(url: string) {
    const response = await this.superagent
    .del(`${Agent.apiRoot}${url}`)
    .set(CONTENT_TYPE_HEADER, APPLICATION_JSON)
    .set(ACCEPT_HEADER, APPLICATION_JSON)
    .end(this.handleErrors);

    return this.responseBody(response);
  }

  private handleErrors = (error: object) => error;
  private responseBody = (response: _superagent.Response) => response.body;
}
