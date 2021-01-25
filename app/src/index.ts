import express from 'express'
import logger from 'morgan'
import * as path from 'path'
import * as bodyParser from 'body-parser'
import {exec} from "child_process"

const app = express()
const PORT = 4242
const PAGE_PATH = path.join(__dirname, '../../public')

app.use(logger('dev'))
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(PAGE_PATH))

// protect the API:
app.disable('x-powered-by');

function inlineExec(cmd: string, res: any, mapData?: (stdout: string) => string) {
  exec(cmd, (error, stdout, stderr) => {
    if (!error) {
      res.send(JSON.stringify({
        data: JSON.parse(!!mapData ? mapData(stdout) : stdout)
      }))
    } else {
      res.send(JSON.stringify({
        error: stderr
      }))
    }
  })
}

function error(msg: string, res: any) {
  res.send(JSON.stringify({
    error: msg
  }))
}

app.post('/api', (req, res) => {
  const args = req.body?.args
  const ns = req.body?.namespace

  if (!ns) {
    error('No namespace specified', res)
    return;
  }

  switch (req.body.cmd) {
    case 'repositories': {
      inlineExec(`az acr repository list -n ${ns}`, res)
      break
    }
    case 'show-manifests': {
      if (!args?.repo) {
        error('Missing argument repo in args', res)
        break
      }
      inlineExec(`az acr repository show-manifests --name ${ns} --repository ${args.repo}`, res)
      break
    }
  }
})

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
})
