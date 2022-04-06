build:
	docker-compose -f docker-compose.yml build $(c)
up:
	docker-compose -f docker-compose.yml up -d $(c)
down:
	docker-compose -f docker-compose.yml down $(c)
stop:
	docker-compose -f docker-compose.yml stop $(c)
logs:
	docker-compose -f docker-compose.yml logs --tail=100 -f $(c)
migrate:
	docker-compose -f docker-compose.yml run api npm run db:migrate:force
seed:
	docker-compose -f docker-compose.yml run api npm run db:seed