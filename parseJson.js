var parseJson = function(jsonStr){
  var i= 0
  var str = jsonStr
  return parseValue()

  debugger
  function parseValue(){
    if(str[i] === '{'){
      return parseObject(str)
    }else if(str[i] === '['){
      return parseArray(str)
    }else if(str[i] === 'n'){
      return parseNull()
    }else if(str[i] === 't'){
      return parseTrue()
    }else if(str[i] === 'f'){
      return parseFalse()
    }else if(str[i] ==='"'){
      return parseString()
    }else {
      return parseNumber()
    }
  }

  function parseObject(){
    i++
    var result = {}
    while(str[i] != '}'){
      var key = parseString()
      i++
      var value = parseValue()
      result[key] = value
      if(str[i] === ','){
        i++
      }
    }
    i++
    return result
  }

  function parseArray() {
    i++
    var result = []
    while(str[i] != ']'){
      result.push(parseValue())
      if(str[i] === ','){
        i++
      }
    }
    i++
    return result
  }

  function parseString(){
    var result = ''
    i++
    while(str[i] != '"'){
      result += str[i++]
    }
    i++
    return result
  }

  function parseNull(){
    var content = str.substr(i,4)
    if(content === 'null'){
      i += 4
          return null
    }else{
      throw new Error('Unexpected char:' + i)
    }
  }

  function parseTrue(){
    var content = str.substr(i,4)
    if(content === 'true'){
      i += 4
          return true
    }else{
      throw new Error('Unexpected char:' + i)
    }
  }

  function parseFalse(){
    var content = str.substr(i,5)
    if(content === 'false'){
      i += 5
          return false
    }else{
      throw new Error('Unexpected char:' + i)
    }
  }

  function parseNumber(){
    var numStr = ''
    while(isNumberChar(str[i])) {
      numStr += str[i++]
    }
    return parseFloat(numStr)
  }

  function isNumberChar(c) {
    var chars = {
      '-' : true,
      '+' : true,
      'e' : true,
      'E' : true,
      '.' : true
    }
    if(chars[c]){
      return true
    }else if(c >= '0' && c <= '9'){
      return true
    }else{
      return false
    }
  }
}