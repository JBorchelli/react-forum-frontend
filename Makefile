FRONTEND_CONTAINER=tavern_frontend_frontend_1
PACKAGE=

docker-build:
	( \
		docker-compose up -d --build; \
	)

docker-stop:
	( \
		docker-compose stop; \
	)

docker-start:
	( \
		docker-compose up -d; \
	)

docker-restart:
	( \
		docker-compose stop; \
		docker-compose up -d; \
	)

docker-diag:
	( \
		docker-compose up; \
	)

docker-down:
	( \
		docker-compose down; \
	)

web-bash:
	( \
		docker exec -ti tavern_frontend_frontend_1 bash; \
	)

install:
	(	\
		docker exec ${FRONTEND_CONTAINER} bash -c "npm install ${PACKAGE} && cp package.json ./src/package_bound.json"; \
		cp -u ./tavern_frontend/src/package_bound.json ./tavern_frontend/package.json; \
	)

uninstall:
	(	\
		docker exec ${FRONTEND_CONTAINER} bash -c "npm uninstall ${PACKAGE} && cp package.json ./src/package_bound.json"; \
		cp -u ./tavern_frontend/src/package_bound.json ./tavern_frontend/package.json; \
	)
