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

.factory getDigests: <[$resource]> ++ ($resource) ->
  x = [
    { tag-id: 1, type: 'digest', title: '服務協議', body: "才能請財政部依照大的方針去作處理，如果我現在宣布要做，我了解這一定是事實，在暫定執法線的範圍內，在難以兩全的情況下，我不是那麼專精，但要說到讓每個民眾都知道，有很多事項是不宜用公投來進行的，為了國家的需要，國防部所占比例的確相當高。", authorName: "hychen", publishTime: "2013年10月12日" },
    { tag-id: 1, type: 'digest', title: '服務協議', body: "還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴！", authorName: "hychen", publishTime: "2013年10月12日" },
    { tag-id: 1, type: 'digest', title: '服務協議', body: "一位像有學識的人說，特別為他倆合奏著進行曲；只有這樂聲在這黑暗中歌唱著，由隘巷中走出來，因為一片暗黑，拔去了不少，這時候風雨也停止進行曲的合奏，放不少鞭炮，在家裡有壓歲錢的分賜，當科白尼還未出世，多有了袖著手、縮著頸、聳著肩、伸著腰、打呵欠的樣子。", authorName: "hychen", publishTime: "2013年10月12日" },
  ]
# .factory getDigests: <[$resource]> ++ ($resource) ->
#   sentence = $resource('https://more.handlino.com/sentences.json')
#   sentence = $resource('https://api.github.com/users/iamsc')

#   [1 to 3].map ->
#     x = { tag-id: 1, type: 'digest', title: '服務協議', body: "", authorName: "hychen", publishTime: "2013年10月12日" }
#     <-! sentence.get
#     x.body = it.sentences


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