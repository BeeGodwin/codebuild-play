import "phaser";
import { aws } from '../../ci/default'

export default {
  phaserConfig: {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
  },
  aws,
};
