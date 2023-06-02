import { Controller, Post } from '@nestjs/common';

import { ImageComparisonService } from './image-comparison.service';

@Controller('image-comparison')
export class ImageComparisonController {
    constructor(private readonly imageComparisonService: ImageComparisonService) {}

    @Post()
    async performImageComparison(): Promise<{ compatibility: number }> {
        const htmlCode = `<body>
        <div class="foot"></div>
        <div class="main"></div>
        <div class="type-1">
          <div class="item1"></div>
          <div class="item1"></div>
          <div class="item1"></div>
          <div class="item1"></div>
        </div>
        <div class="type-2">
          <div class="item2"></div>
          <div class="item2"></div>
          <div class="item2"></div>
        </div>
      </body>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          background-color: #6592CF;
          position: relative;
        }
        .foot {
          width: 20px;
          height: 100px;
          background-color: #060F55;
          position: absolute;
          bottom: 0;
          left: calc(50% - 10px);
        }
        .main {
          height: 150px;
          width: 140px;
          background-color: #060F55;
          border-bottom-left-radius: 100px;
          border-bottom-right-radius: 100px;
          position: absolute;
          bottom: 50px;
          left: calc(50% - 70px)
        }
        .type-1 {
          display: flex;
          gap: 20px;
          position: absolute;
          top:50px; 
          left: calc(50% - 70px);
        }
        .item1 {
          width: 20px;
          height: 100px;
          background-color: #060F55;
          border-top-left-radius: 100px;
          border-top-right-radius: 100px;
        }
        .type-2 {
          display: flex;
          gap: 20px;
          position: absolute;
          top:60px; 
          left: calc(50% - 50px);
        }
        .item2 {
          width: 40px;
          height: 100px;
          background-color: #6592CF;
          border-bottom-left-radius: 100px;
          border-bottom-right-radius: 100px;
        }
      </style>
      
      `;
        // const imgPath = './143.png';
        const compatibility = await this.imageComparisonService.compare(htmlCode);

        return { compatibility };
    }
}
