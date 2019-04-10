import fs from 'fs-extra'
import CsvReadableStream from 'csv-reader'
import AutoDetectDecoderStream from 'autodetect-decoder-stream'

export const run = ({ state, element, events, iteration }) => {
  state.csvData = []
 	if(state.filePath){
    return new Promise(resolve => {
      var inputStream = fs
        .createReadStream(state.filePath)
        .pipe(new AutoDetectDecoderStream({ defaultEncoding: '1255' }))

      inputStream
        .pipe(CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
        .on('data', function (row) {
          state.csvData.push(row)
        }).on('end', function (data) {
          element.innerHTML = `Loaded: ${state.filePath}`
          resolve()
        })
    })
  }else{
    element.innerHTML = 'No Path Provided'
  }
}