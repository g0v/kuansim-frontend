DATADIR="test/data"
TARGET=http://127.0.0.1:6987/collections/news
HYFAKEDATA=https://raw.github.com/hychen/mockdata_generator/master/data/kuansim/news.json

CURL=curl -i -H "Content-Type: application/json" 
PUT=${CURL} -X PUT
HASID=-H "x-pgrest-create-identity-key: yes"

USERJSON=${HYFAKEDATA}/users.json
NEWSJSON=${HYFAKEDATA}/news.json

import ::
	${PUT} ${HASID} -d @${DATADIR}/users.json ${TARGET}
	${PUT} -d @${DATEDIR}/news.json ${TARGET}

checkout ::
	-mkdir -p ${DATADIR}
	-wget ${USERJSON}  -O ${DATADIR}/users.json
	-wget ${NEWSJSON}  -O ${DATADIR}/news.json
