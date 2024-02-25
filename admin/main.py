from telegram import Update
from telegram.ext import ApplicationBuilder, MessageHandler, ContextTypes
from PIL import Image
from ftplib import FTP
from dotenv import load_dotenv
from os import environ, remove


def resize(id, img, size, ftp):
    resized = img.copy()
    url = f'{id}-{size[0]}.webp'
    resized.thumbnail(size)
    resized.save(url)
    with open(url, 'rb') as f:
        ftp.storbinary(f'STOR {url}', f)
    remove(url)


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if update.effective_chat.id != -4091528011:
        return
    ftp = FTP(environ['FTP_HOST'], environ['FTP_USER'], environ['FTP_PASSWORD'])
    ftp.cwd('www/mf-images')
    images = [int(i[:-5].split('-')[0]) for i in ftp.nlst() if '.webp' in i]
    id = max(images) + 1
    file = await update.message.document.get_file()
    bt = await file.download_to_drive()
    img = Image.open(bt)
    resize(id, img, (224, 229), ftp)
    resize(id, img, (175, 160), ftp)
    resize(id, img, (600, 424), ftp)
    ftp.quit()
    remove(bt)
    await context.bot.send_message(update.effective_chat.id, f'{id}')
    
    
if __name__ == '__main__':
    load_dotenv()
    
    application = ApplicationBuilder().token(environ['BOT_TOKEN']).build()
    
    start_handler = MessageHandler(None, start)
    application.add_handler(start_handler)
    
    application.run_polling()