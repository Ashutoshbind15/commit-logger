FROM alpine:3.10

LABEL "com.github.actions.name"="Log Commit Message"
LABEL "com.github.actions.description"="Logs the message of the current commit"
LABEL "com.github.actions.icon"="terminal"
LABEL "com.github.actions.color"="blue"

ADD entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
