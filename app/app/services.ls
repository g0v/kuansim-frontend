# Services

# Create an object to hold the module.
mod = version: -> "0.1"

angular.module 'app.services' <[ngResource]>
.factory getIssues: <[$http]> ++ ($http) ->
  x = [
    { tag-id: 1, type: 'issue', title: '胖達人事件', kaunsimNumber: 2000, actionNumber: 17367, standpointsNumber: 426 },
    { tag-id: 1, type: 'issue', title: '洪仲丘事件', kaunsimNumber: 2000, actionNumber: 78563, standpointsNumber: 6723 },
    { tag-id: 1, type: 'issue', title: '九月政爭', kaunsimNumber: 23000000, actionNumber: 2, standpointsNumber: 22999997 },
  ]

.factory getDigests: <[$http]> ++ ($http) !->
  result = []
  for i from 1 to 3
    $http.jsonp('http://more.handlino.com/sentences.json?callback=JSON_CALLBACK')
    .success (data) !->
      x = { tag-id: 1, type: 'digest', title: '小開請客', body: '', authorName: "hychen", publishTime: "2013年10月12日" }
      x.body = data.sentences[0]
      result.push x

  return result

.factory getPetitions: <[$http]> ++ ($http) ->
  x = [
    { tag-id: 1, type: 'petition', title: '倒閣案', petitionNumber: 200 },
    { tag-id: 1, type: 'petition', title: '服務協議', petitionNumber: 300 },
    { tag-id: 1, type: 'petition', title: 'hychen請客', petitionNumber: '∞' },
  ]

.factory getActions: <[$http]> ++ ($http) ->
  x = [
    { tag-id: 1, type: 'action', title: 'Color Run', peopleNumber: 5 },
    { tag-id: 1, type: 'action', title: 'New iphone', peopleNumber: 500000 },
    { tag-id: 1, type: 'action', title: '喝飲料', peopleNumber: 50 },
  ]