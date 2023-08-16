#!/bin/bash
cd /home/brestrepo/Github/Human_Resources_App
	source .venv/bin/activate && \
	cd backend  &&\
	export FLASK_APP=hhrr_app && export FLASK_DEBUG=true && \
        flask run -p 5002
