import { Injectable } from '@nestjs/common';
import axios from 'axios';
// import * as fs from 'fs';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import * as puppeteer from 'puppeteer';
// import { async } from 'rxjs';

@Injectable()
export class ImageComparisonService {
    async convertHtmlToImage(htmlCode: string): Promise<Buffer> {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport({
            width: 400,
            height: 300,
            deviceScaleFactor: 1
        });
        await page.setContent(htmlCode);
        const imgBuffer = await page.screenshot({
            encoding: 'binary'
        });
        await browser.close();

        return imgBuffer;
    }

    async compare(htmlCode: string): Promise<number> {
        const imageUrl = 'https://res.cloudinary.com/de41uvd76/image/upload/v1685721835/8_2x_1_eq8wth.png';
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const imgDestination = PNG.sync.read(response.data);
        const imgCheckBuffer = await this.convertHtmlToImage(htmlCode);
        const imgCheck = PNG.sync.read(imgCheckBuffer);

        if (imgDestination.width !== imgCheck.width || imgDestination.height !== imgCheck.height) {
            return 0; // Return 0 if image sizes do not match
        }

        const { width, height, data } = imgDestination;
        const diff = new PNG({ width, height });
        const difference = pixelmatch(data, imgCheck.data, diff.data, width, height, {
            threshold: 0.1
        });

        return 100 - (difference * 100) / (width * height);
    }
}
