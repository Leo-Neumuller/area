import atexit
from src.cron.Flux import execute_flux
from apscheduler.schedulers.background import BackgroundScheduler

scheduler = BackgroundScheduler()
scheduler.add_job(func=execute_flux, trigger="interval", seconds=60)
scheduler.start()

atexit.register(lambda: scheduler.shutdown())
