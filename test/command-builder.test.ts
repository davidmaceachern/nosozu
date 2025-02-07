import { CommandBuilder } from "../src/command-builder"

import addBackend from "./assets/add_backend.json"
import addCertificate from "./assets/add_certificate.json"
import addHttpFront from "./assets/add_http_front.json"
import addHttpsFront from "./assets/add_https_front.json"
import dumpState from "./assets/dump_state.json"
import hardStop from "./assets/hard_stop.json"
import listWorkers from "./assets/list_workers.json"
import loadState from "./assets/load_state.json"
import removeBackend from "./assets/remove_backend.json"
import removeCertificate from "./assets/remove_certificate.json"
import removeHttpFront from "./assets/remove_http_front.json"
import removeHttpsFront from "./assets/remove_https_front.json"
import saveState from "./assets/save_state.json"
import softStop from "./assets/soft_stop.json"
import status from "./assets/status.json"
import upgradeMaster from "./assets/upgrade_master.json"

describe('Command builder can handle:', () => {

  test('creating ADD_BACKEND', () => {
    let commandBuilder: CommandBuilder = new CommandBuilder()
    const command = {
      "data": {
        "app_id": "xxx",
        "backend_id": "xxx-0",
        "ip_address": "127.0.0.1",
        "port": 8080,
      },
      "type": "ADD_BACKEND",
    }
    const expected = addBackend

    const commandRequest = commandBuilder.buildCommandRequest(command)

    expect(commandRequest).toEqual(expected)
  })
  test('creating ADD_CERTIFICATE', () => {
    let commandBuilder: CommandBuilder = new CommandBuilder()
    const command = {
      "data": {
        "certificate": "-----BEGIN CERTIFICATE-----\nMIIDJjCCAg6gAwIBAgIJAKio5/9xAoHyMA0GCSqGSIb3DQEBBQUAMBYxFDASBgNV\nBAMTC2xvbGNhdGhvLnN0MB4XDTE1MTExODE1MDczOFoXDTE1MTIxODE1MDczOFow\nFjEUMBIGA1UEAxMLbG9sY2F0aG8uc3QwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAw\nggEKAoIBAQDBfVivbeRNNfd+lXJ9JUhC6zJGgs0+n781d43/uP4Ye77DVNmLVArT\nKbUYTFpWe69Glwap1r7kIuayqsSYljIL5Z7TJD/XgnHXW8Hb74B1j5JlwsKBu3O1\nTkQ0AhTM7WHYPbE1xPjIaqJz+6y23q9A/SomOiYCN2a4WmhKH67fU1D/cjdE0ubS\neXfaKz1lm0iH6kBBGavTWtDx+BXn0D+SASlsRd0PzF6b7QoioYLUMip0vltOehxM\na+xyTKVkLYasXnXo+0270aIVF1Sm8tjVwWepxcXvRFIlPFV5mB8slr+ASkiVRn/7\nIpYKRl8YbYZT5CvTvpgLdpNTIXtsJer9AgMBAAGjdzB1MB0GA1UdDgQWBBRMvY+c\nt0s3XiiXiCcBdZa1WIyEzTBGBgNVHSMEPzA9gBRMvY+ct0s3XiiXiCcBdZa1WIyE\nzaEapBgwFjEUMBIGA1UEAxMLbG9sY2F0aG8uc3SCCQCoqOf/cQKB8jAMBgNVHRME\nBTADAQH/MA0GCSqGSIb3DQEBBQUAA4IBAQA4DEmS+ScCDNhMWy4ZHkRekfdcmW4+\ngm6EghnL1G3iyUS/GBZ4mbcPDTvNmHdbyjUiN0aphFoqCQk4tsF8eUluQpy0mD3/\nbjvWK7FJk99KLEBFw0hyxp4esZ5j3xnd6oG7QG2rA4GOhpDvLe5GQ8EWJAb5OeE1\nKuoL9vLaFdBcA5kG6xWVGJ5pqN9n37GKcBwWRsbiF37wjGR3iIPUnpGRUNubztXU\n/5EbJshZRIDlTldKZoKgfD0XMQjvkbC/wOaZNUvsFjvq6miRmSAmoKZ16oKDsUq2\nXmNFv7LrfHj+sUmJnu6ZRwWhtF8RTjBgNOwEqf+lDSYkg3Y3giVzzO3v\n-----END CERTIFICATE-----\n",
        "certificate_chain": [
          "-----BEGIN CERTIFICATE-----\nMIIDJjCCAg6gAwIBAgIJAKio5/9xAoHyMA0GCSqGSIb3DQEBBQUAMBYxFDASBgNV\nBAMTC2xvbGNhdGhvLnN0MB4XDTE1MTExODE1MDczOFoXDTE1MTIxODE1MDczOFow\nFjEUMBIGA1UEAxMLbG9sY2F0aG8uc3QwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAw\nggEKAoIBAQDBfVivbeRNNfd+lXJ9JUhC6zJGgs0+n781d43/uP4Ye77DVNmLVArT\nKbUYTFpWe69Glwap1r7kIuayqsSYljIL5Z7TJD/XgnHXW8Hb74B1j5JlwsKBu3O1\nTkQ0AhTM7WHYPbE1xPjIaqJz+6y23q9A/SomOiYCN2a4WmhKH67fU1D/cjdE0ubS\neXfaKz1lm0iH6kBBGavTWtDx+BXn0D+SASlsRd0PzF6b7QoioYLUMip0vltOehxM\na+xyTKVkLYasXnXo+0270aIVF1Sm8tjVwWepxcXvRFIlPFV5mB8slr+ASkiVRn/7\nIpYKRl8YbYZT5CvTvpgLdpNTIXtsJer9AgMBAAGjdzB1MB0GA1UdDgQWBBRMvY+c\nt0s3XiiXiCcBdZa1WIyEzTBGBgNVHSMEPzA9gBRMvY+ct0s3XiiXiCcBdZa1WIyE\nzaEapBgwFjEUMBIGA1UEAxMLbG9sY2F0aG8uc3SCCQCoqOf/cQKB8jAMBgNVHRME\nBTADAQH/MA0GCSqGSIb3DQEBBQUAA4IBAQA4DEmS+ScCDNhMWy4ZHkRekfdcmW4+\ngm6EghnL1G3iyUS/GBZ4mbcPDTvNmHdbyjUiN0aphFoqCQk4tsF8eUluQpy0mD3/\nbjvWK7FJk99KLEBFw0hyxp4esZ5j3xnd6oG7QG2rA4GOhpDvLe5GQ8EWJAb5OeE1\nKuoL9vLaFdBcA5kG6xWVGJ5pqN9n37GKcBwWRsbiF37wjGR3iIPUnpGRUNubztXU\n/5EbJshZRIDlTldKZoKgfD0XMQjvkbC/wOaZNUvsFjvq6miRmSAmoKZ16oKDsUq2\nXmNFv7LrfHj+sUmJnu6ZRwWhtF8RTjBgNOwEqf+lDSYkg3Y3giVzzO3v\n-----END CERTIFICATE-----",
          "-----BEGIN CERTIFICATE-----\nMIIDJjCCAg6gAwIBAgIJAKio5/9xAoHyMA0GCSqGSIb3DQEBBQUAMBYxFDASBgNV\nBAMTC2xvbGNhdGhvLnN0MB4XDTE1MTExODE1MDczOFoXDTE1MTIxODE1MDczOFow\nFjEUMBIGA1UEAxMLbG9sY2F0aG8uc3QwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAw\nggEKAoIBAQDBfVivbeRNNfd+lXJ9JUhC6zJGgs0+n781d43/uP4Ye77DVNmLVArT\nKbUYTFpWe69Glwap1r7kIuayqsSYljIL5Z7TJD/XgnHXW8Hb74B1j5JlwsKBu3O1\nTkQ0AhTM7WHYPbE1xPjIaqJz+6y23q9A/SomOiYCN2a4WmhKH67fU1D/cjdE0ubS\neXfaKz1lm0iH6kBBGavTWtDx+BXn0D+SASlsRd0PzF6b7QoioYLUMip0vltOehxM\na+xyTKVkLYasXnXo+0270aIVF1Sm8tjVwWepxcXvRFIlPFV5mB8slr+ASkiVRn/7\nIpYKRl8YbYZT5CvTvpgLdpNTIXtsJer9AgMBAAGjdzB1MB0GA1UdDgQWBBRMvY+c\nt0s3XiiXiCcBdZa1WIyEzTBGBgNVHSMEPzA9gBRMvY+ct0s3XiiXiCcBdZa1WIyE\nzaEapBgwFjEUMBIGA1UEAxMLbG9sY2F0aG8uc3SCCQCoqOf/cQKB8jAMBgNVHRME\nBTADAQH/MA0GCSqGSIb3DQEBBQUAA4IBAQA4DEmS+ScCDNhMWy4ZHkRekfdcmW4+\ngm6EghnL1G3iyUS/GBZ4mbcPDTvNmHdbyjUiN0aphFoqCQk4tsF8eUluQpy0mD3/\nbjvWK7FJk99KLEBFw0hyxp4esZ5j3xnd6oG7QG2rA4GOhpDvLe5GQ8EWJAb5OeE1\nKuoL9vLaFdBcA5kG6xWVGJ5pqN9n37GKcBwWRsbiF37wjGR3iIPUnpGRUNubztXU\n/5EbJshZRIDlTldKZoKgfD0XMQjvkbC/wOaZNUvsFjvq6miRmSAmoKZ16oKDsUq2\nXmNFv7LrfHj+sUmJnu6ZRwWhtF8RTjBgNOwEqf+lDSYkg3Y3giVzzO3v\n-----END CERTIFICATE-----"
        ],
        "key": "-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEAwX1Yr23kTTX3fpVyfSVIQusyRoLNPp+/NXeN/7j+GHu+w1TZ\ni1QK0ym1GExaVnuvRpcGqda+5CLmsqrEmJYyC+We0yQ/14Jx11vB2++AdY+SZcLC\ngbtztU5ENAIUzO1h2D2xNcT4yGqic/ustt6vQP0qJjomAjdmuFpoSh+u31NQ/3I3\nRNLm0nl32is9ZZtIh+pAQRmr01rQ8fgV59A/kgEpbEXdD8xem+0KIqGC1DIqdL5b\nTnocTGvsckylZC2GrF516PtNu9GiFRdUpvLY1cFnqcXF70RSJTxVeZgfLJa/gEpI\nlUZ/+yKWCkZfGG2GU+Qr076YC3aTUyF7bCXq/QIDAQABAoIBABFSUl0qHlUXLrfj\nUyOG8egjvBV54jvn+ysjL9Aj1IOGmHZOI0eI14s94ZtyQmgZnIBaRttvgRlVUofO\nJ9ltIL/V55kJVrnJUL2x1jIFR9++YaHAhL8uc9ZYUlzBjvElkyvTogipQIhYm4B8\nmGKqns/Xmi1f6UUrhoOcfFeebH5LhEAPs4zbqm52ISsw3JkNmKnbh5FYV6oLIPC2\nxYqF9A0Jm8yo+D9gIj4AyvYzTD4ouyJsJO8RwbXBLHtjP82UsuhcvKiof5Olsvo0\nKd8o84Cbgder92Yswgk/yGgch2gflZzP461khIaeMrSk38YOyNAm4qv9lRpgYWCQ\ne8TcoPUCgYEA6dPT4dJYp+WoinkXvpIhGyVQO7NYnxYvfbgD9yp6vpQJPOt2e66l\nSg0b6Qu+TITdm+iKuRNfe+ykrHeGCYnTWnphmcMn+l6xX5lsJu6ksxUCN/tX1o13\nqRA2wT+LwQXEchOGZ+rpkpfLczBRd52eDCGJEH07TDtYBiRBsKWIGksCgYEA09ZQ\n/OO93Z2u893eI/C/QxhUDdpsOZ8SJijRa4W5DST989JqXznz6hicdvYQREC2zrn2\nI1WPRPuDQgytbHlVC9D2I7CpYhsNYfKFbpbjsg4b+dRP3kV5ZdeMrz2hDKih97Xq\n0kEFtOt9eehq9ZOR9Y1u1kVaibsylxckuBXhwtcCgYAcXGoNsOK58pwft5JOthC3\n5y21IAq2uQ0nlYM9nnRm2zPHpNOpKsS3l6F0Ac2iIFd0yp7Q1e217T0IAjNKwuHU\nzpU5/jbCImwnKUe57SYi5oBvY9gCmQQTiHjrtZZw4g8yuvWJcy/DbQ/rN8gZ1w9N\nb1/dlSL1GxmRHSKul1VLwwKBgQCoBd/rFoDsnTu9toeSHky2XT+eVVduRNvSZKHn\nFQP4hxTfJlC1A3SSg77nJLk2SdY2Fo5C7IRdBNnRs9iCp6JrYu041dEkPazZudFY\nLFqiSkqqWFqZRKXLv7KY9Nse/Uqq/iIpbuWl4Pt/jHf6HXiyOeJmFlB/2nmAGh1H\n3iNZtQKBgQCXrD05rdsaNf3Hy9xC1+iHE9YDRzZ5pV0lCyswYR/0GwItF68lqbsI\nhiQyzq8pehWxB021EqkNR+Wn/U5V3vHoVQY13hHaeGkoZvXxOiYeB64Y6cG6dJb+\nF/dzHvorjY0vXaztensj562uXdCp433soeZThX2Ag5y0B7fMszffbQ==\n-----END RSA PRIVATE KEY-----\n"
      },
      "type": "ADD_CERTIFICATE",
    }
    const expected = addCertificate

    const commandRequest = commandBuilder.buildCommandRequest(command)

    expect(commandRequest).toEqual(expected)
  })
  test('creating ADD_HTTP_FRONT', () => {
    let commandBuilder: CommandBuilder = new CommandBuilder()
    const command = {
      "data": {
        "app_id": "xxx",
        "hostname": "yyy",
        "path_begin": "xxx"
      },
      "type": "ADD_HTTP_FRONT",
    }
    const expected = addHttpFront

    const commandRequest = commandBuilder.buildCommandRequest(command)

    expect(commandRequest).toEqual(expected)
  })
  test('creating ADD_HTTPS_FRONT', () => {
    let commandBuilder: CommandBuilder = new CommandBuilder()
    const command = {
      "data": {
        "app_id": "xxx",
        "hostname": "yyy",
        "path_begin": "xxx",
        "fingerprint": "ab2618b674e15243fd02a5618c66509e4840ba60e7d64cebec84cdbfeceee0c5"
      },
      "type": "ADD_HTTPS_FRONT",
    }
    const expected = addHttpsFront

    const commandRequest = commandBuilder.buildCommandRequest(command)

    expect(commandRequest).toEqual(expected)
  })
  test('creating DUMP_STATE', () => {
    let commandBuilder: CommandBuilder = new CommandBuilder()
    const command = {
      "type": "DUMP_STATE",
    }
    const expected = dumpState 

    const commandRequest = commandBuilder.buildCommandRequest(command)

    expect(commandRequest).toEqual(expected)
  })
  test('creating HARD_STOP', () => {
    let commandBuilder: CommandBuilder = new CommandBuilder()
    const command = { "type": "HARD_STOP" }
    const expected = hardStop 

    const commandRequest = commandBuilder.buildCommandRequest(command)

    expect(commandRequest).toEqual(expected)
  })
  test('creating LIST_WORKERS', () => {
    let commandBuilder: CommandBuilder = new CommandBuilder()
    const command = { type: "LIST_WORKERS" }
    const expected = listWorkers 

    const commandRequest = commandBuilder.buildCommandRequest(command)

    expect(commandRequest).toEqual(expected)
  })
  test('creating LOAD_STATE', () => {
    let commandBuilder: CommandBuilder = new CommandBuilder()
    const command = {
      "data": {
        "path": "./config_dump.json"
      }, 
      "type": "LOAD_STATE",
    }
    const expected = loadState 

    const commandRequest = commandBuilder.buildCommandRequest(command)

    expect(commandRequest).toEqual(expected)
  })
  test('creating REMOVE_BACKEND', () => {
    let commandBuilder: CommandBuilder = new CommandBuilder()
    const command = {
      "data": {
        "app_id": "xxx",
        "backend_id": "xxx-0",
        "ip_address": "127.0.0.1",
        "port": 8080
      },
      "type": "REMOVE_BACKEND",
    }
    const expected = removeBackend 

    const commandRequest = commandBuilder.buildCommandRequest(command)

    expect(commandRequest).toEqual(expected)
  })
  test('creating REMOVE_CERTIFICATE', () => {
    let commandBuilder: CommandBuilder = new CommandBuilder()
    const command = {
      "data": { "data": "ab2618b674e15243fd02a5618c66509e4840ba60e7d64cebec84cdbfeceee0c5" },
      "type": "REMOVE_CERTIFICATE",
    }
    const expected = removeCertificate 

    const commandRequest = commandBuilder.buildCommandRequest(command)

    expect(commandRequest).toEqual(expected)
  })
  test('creating REMOVE_HTTP_FRONT', () => {
    let commandBuilder: CommandBuilder = new CommandBuilder()
    const command = {
      "data": {
        "app_id": "xxx",
        "hostname": "yyy",
        "path_begin": "xxx"
      },
      "type": "REMOVE_HTTP_FRONT",
    }
    const expected = removeHttpFront 

    const commandRequest = commandBuilder.buildCommandRequest(command)

    expect(commandRequest).toEqual(expected)
  })
  test('creating REMOVE_HTTPS_FRONT', () => {
    let commandBuilder: CommandBuilder = new CommandBuilder()
    const command = {
    "data": {
      "app_id": "xxx",
      "hostname": "yyy",
      "path_begin": "xxx",
      "fingerprint": "ab2618b674e15243fd02a5618c66509e4840ba60e7d64cebec84cdbfeceee0c5"
    },
    "type": "REMOVE_HTTPS_FRONT",
    }
    const expected = removeHttpsFront 

    const commandRequest = commandBuilder.buildCommandRequest(command)

    expect(commandRequest).toEqual(expected)
  })
  test('creating SAVE_STATE', () => {
    let commandBuilder: CommandBuilder = new CommandBuilder()
    const command = {
      "data": {
        "path": "./config_dump.json"
      },
      "type": "SAVE_STATE",
    }
    const expected = saveState 

    const commandRequest = commandBuilder.buildCommandRequest(command)

    expect(commandRequest).toEqual(expected)
  })
  test('creating SOFT_STOP', () => {
    let commandBuilder: CommandBuilder = new CommandBuilder()
    const command = {
      "type": "SOFT_STOP"
    }
    const expected = softStop 

    const commandRequest = commandBuilder.buildCommandRequest(command)

    expect(commandRequest).toEqual(expected)
  })
  test('creating STATUS', () => {
    let commandBuilder: CommandBuilder = new CommandBuilder()
    const command = { type: "status" }
    const expected = status 

    const commandRequest = commandBuilder.buildCommandRequest(command)

    expect(commandRequest).toEqual(expected)
  })
  test('creating UPGRADE_MASTER', () => {
    let commandBuilder: CommandBuilder = new CommandBuilder()
    const command = {
      "type": "UPGRADE_MASTER",
    }

    const expected = upgradeMaster 

    const commandRequest = commandBuilder.buildCommandRequest(command)

    expect(commandRequest).toEqual(expected)
  })
  
  // // TODO: do we test the default case?
  // test('Throwing an error when an unknown command is requested', () => {
  //   let commandBuilder: CommandBuilder = new CommandBuilder()
  //   const command = { type: "unknown command" }

  //   const commandRequest = commandBuilder.buildCommandRequest(command)

  //   expect(commandRequest).toThrow(Error)
  // })
})