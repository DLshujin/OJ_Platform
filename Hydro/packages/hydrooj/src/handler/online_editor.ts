import { Context } from '../context';
import { Handler } from '../service/server';

class GocProgrammingHandler extends Handler {
  async get() {
    this.response.template = 'goc_online.html';
    this.response.body = {
      page_name: 'goc_online',
    };
  }
}

class ScratchProgrammingHandler extends Handler {
  async get() {
    this.response.template = 'scratch_online.html';
    this.response.body = {
      page_name: 'scratch_online',
    };
  }
}

class IdeProgrammingHandler extends Handler {
  async get() {
    this.response.template = 'ide_online.html';
    this.response.body = {
      page_name: 'ide_online',
    };
  }
}

class PracticeHandler extends Handler {
  async get() {
    this.response.template = 'practice.html';
    this.response.body = {
      page_name: 'practice',
    };
  }
}

export function apply(ctx: Context) {
  ctx.Route('goc_online', '/goc', GocProgrammingHandler);
  ctx.Route('scratch_online', '/scratch', ScratchProgrammingHandler);
  ctx.Route('ide_online', '/ide', IdeProgrammingHandler);
  ctx.Route('practice', '/practice', PracticeHandler);
}
