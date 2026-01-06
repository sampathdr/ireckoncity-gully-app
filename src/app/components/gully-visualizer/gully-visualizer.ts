import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gully } from '../../models/gully.model';

@Component({
  selector: 'app-gully-visualizer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gully-visualizer.html',
  styleUrls: ['./gully-visualizer.scss'],
  inputs: ['gully'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GullyVisualizerComponent implements OnInit {
  @Input({ required: true }) gully!: Gully;

  // Fixed SVG dimensions to ensure consistent layout
  readonly svgFixedWidth = 400;
  readonly svgFixedHeight = 400;
  readonly padding = 60;
  readonly wallThickness = 4;

  // Scale will be used to calculate dimensions dynamically based on gully dimensions
  scale: number = 1;

  ngOnInit(): void {
    this.calculateScale();
  }

  ngOnChanges(): void {
    this.calculateScale();
  }

  private calculateScale(): void {
    if (!this.gully) return;

    // Calculate available space inside the SVG (excluding padding)
    const availableWidth = this.svgFixedWidth - this.padding * 2;
    const availableHeight = this.svgFixedHeight - this.padding * 2;

    // Calculate scale based on width and height, then take the minimum to ensure everything fits
    const widthScale = availableWidth / this.gully.widthInCM;
    const heightScale = availableHeight / this.gully.heightInCM;

    // Use lowest scale to ensure everything fits within both dimensions
    this.scale = Math.min(widthScale, heightScale);
  }

  get svgWidth(): number {
    return this.svgFixedWidth;
  }

  get svgHeight(): number {
    return this.svgFixedHeight;
  }

  //Gully position and dimensions
  get gullyX(): number {
    return this.padding;
  }

  get gullyY(): number {
    return this.padding;
  }

  get gullyWidthPx(): number {
    return this.gully.widthInCM * this.scale;
  }

  get gullyHeightPx(): number {
    return this.gully.heightInCM * this.scale;
  }

  // Water position and dimensions

  get waterHeightPx(): number {
    return this.gully.waterLevelInCM * this.scale;
  }

  get waterY(): number {
    return this.gullyY + this.gullyHeightPx - this.waterHeightPx;
  }

  // Pipe position and dimensions

  get pipeRadiusPx(): number {
    return (this.gully.pipeDiameterInCM * this.scale) / 2;
  }

  get pipeCenterY(): number {
    return this.gullyY + this.gullyHeightPx - this.gully.pipeHeightInCM * this.scale;
  }

  get pipeTopY(): number {
    return this.pipeCenterY - this.pipeRadiusPx;
  }

  get pipeCenterX(): number {
    return this.gullyX + this.gullyWidthPx + 12;
  }

  /* ================= DIMENSION X POSITIONS ================= */

  get dimX1(): number {
    return this.gullyX - 10;
  }

  get dimX2(): number {
    return this.gullyX - 35;
  }

  get dimRightX(): number {
    return this.gullyX + this.gullyWidthPx / 2;
  }
}
