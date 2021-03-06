GameClient.SmallTower = function(conflux, game, x, y, group, data) {
  if(typeof group === 'undefined'){ group = game.world; }
  Phaser.Sprite.call(this, game, x, y, 'tower');
  group.add(this);
  this.inputEnabled = true;
  this.displayingHelp = false;
  this.game = game;
  this.conflux = conflux;

  // Text

  // draw tower name
  this.titleText = this.addChild(this.game.add.text(this.width/2, -40, data.name));
  this.titleText.anchor.setTo(0.5);
  this.titleText.fontSize = 25;
  this.titleText.wordWrap = true;
  this.titleText.wordWrapWidth = 300;
  // draw power cable icon
  this.cable = this.addChild(this.game.make.sprite(-80, this.height+25, 'cableIcons'));
  this.cable.anchor.setTo(0);
  // set cable color
  this.cable.frame = this.conflux.colors[data.towerCable];
  // draw cable description
  this.cableText = this.addChild(this.game.add.text(this.width/2, this.height+50, "<- Power Cable      Data Cable ->"));
  this.cableText.anchor.setTo(0.5);
  this.cableText.fontSize = 14;
  // draw data cable icon
  this.dataCable = this.addChild(this.game.make.sprite(this.width+40, this.height+25, 'cableIcons'));
  this.dataCable.anchor.setTo(0);
  // set cable color
  this.dataCable.frame = this.conflux.colors[data.dataCable];

  // draw round buttons
  for(var i=0;i<data.roundButtons.length;i++){
    if (data.roundButtons[i] != 0) {
      var coords = conflux.dummyRoundButtonsCoordinates[i];
      var button = this.addChild(this.game.make.sprite(coords[0], coords[1], 'roundButtons'));
      button.frame = data.roundButtons[i];
    }
  }

  // draw square buttons
  for(var i=0;i<data.squareButtons.length;i++){
    if (data.squareButtons[i] != 0) {
      var coords = conflux.dummySquareButtonsCoordinates[i];
      var button = this.addChild(this.game.make.sprite(coords[0], coords[1], 'squareButtons'));
      button.frame = data.squareButtons[i];
    }
  }

  // draw switches
  for(var i=0;i<conflux.switchCoordinates.length;i++){
    var coords = conflux.switchCoordinates[i];
    // generate description
    if(i == 0){
      var desc = "Power Toggle";
    } else if (i == 1){
      var desc = "Monitor Mode"
      if(data.towerSwitches.monitorXVD == 'right'){
        desc += " [PDR<->XVD]"
      } else {
        desc += " [XVD<->PDR]"
      }
    }
    var aSwitch = new GameClient.Element(conflux, game, coords[0], coords[1], game.world, 'switch', game.rnd.integerInRange(0, 1), desc);
    this.addChild(aSwitch);
    var marker = this.addChild(this.game.make.sprite(coords[0] + aSwitch.width+5, coords[1]+5, 'marker'))
    marker.frame = i+4;

    var textMarker = this.addChild(this.game.make.sprite(-30, this.height+240+(40*i), 'marker'))
    textMarker.frame = i+4;
    var text = this.addChild(this.game.add.text(0, this.height+243+(40*i), desc));
    text.fontSize = 16;
  }

  for(var i=0;i<4;i++){
    var coords = conflux.portCoordinates[i];
    // generate description
    if(i == data.towerPort){
      var desc = "Display Port"
    } else {
      var desc = conflux.portDescriptions[this.game.rnd.integerInRange(0, conflux.portDescriptions.length-1)];
    }
    var port = new GameClient.Element(conflux, game, coords[0], coords[1], game.world, 'port', 0, desc);
    this.addChild(port);
    var marker = this.addChild(this.game.make.sprite(coords[0] + port.width+5, coords[1]-5, 'marker'))
    marker.frame = (3-i);

    var textMarker = this.addChild(this.game.make.sprite(-30, this.height+200-(40*i), 'marker'))
    textMarker.frame = (3-i);
    var text = this.addChild(this.game.add.text(0, this.height+203-(40*i), desc));
    text.fontSize = 16;
  }
}
GameClient.SmallTower.prototype = Object.create(Phaser.Sprite.prototype);
GameClient.SmallTower.prototype.constructor = GameClient.SmallTower;
