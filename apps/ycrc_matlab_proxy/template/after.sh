#!/usr/bin/env bash

echo "$(date): Waiting for port '${PORT}' to open..."
echo "TIMING - Starting wait at: $(date)"
if wait_until_port_used "${host}:${PORT}" 600; then
	echo "$(date): Discovered process listening on port '${PORT}'!"
	echo "TIMING - Wait ended at: $(date)"
else
	echo "$(date): Timed out waiting port ${PORT} to become open!"
	echo "TIMING - Wait ended at: $(date)"
	pkill -P ${SCRIPT_PID}
	clean_up 1
fi

sleep 2
