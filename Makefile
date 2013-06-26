DATADIR="test/data"
TARGET=http://127.0.0.1:6987/collections/news
CURL=curl -i -H "Content-Type: application/json" 
PUT=${CURL} -X PUT
HASID=-H "x-pgrest-create-identity-key: yes"

import ::
	${PUT} ${HASID} -d @${DATADIR}/users.json ${TARGET}
	${PUT} -d @${DATEDIR}/news.json ${TARGET}

checkout ::
	-mkdir -p ${DATADIR}
	-wget https://raw.github.com/hychen/mockdata_generator/master/data/kuansim/users.json  -O ${DATADIR}/users.json
	-wget https://raw.github.com/hychen/mockdata_generator/master/data/kuansim/news.json  -O ${DATADIR}/news.json
