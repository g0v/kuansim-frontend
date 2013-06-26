DATADIR="test/data"

import ::
	curl -i -H "Content-Type: application/json" \
		-X PUT -d @${DATADIR}/users.json \
		http://127.0.0.1:6987/collections/users

checkout ::
	-mkdir -p ${DATADIR}
	-wget https://raw.github.com/hychen/mockdata_generator/master/data/kuansim/users.json  -O ${DATADIR}/users.json
