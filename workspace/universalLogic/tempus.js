module.exports = 
{
    Tempus : class Tempus{
    constructor(current = 0,existing=""){
      this.cycle = current;
      this.mongoID = existing;
    }
    setCycle()
    {
      this.cycle += 1;
      return this.cycle;
    }
    getCycle()
    {
      return this.cycle;
    }
    getMongoID()
      {
        return this.mongoID;
      }
    returnTime()
    {
      let time = {cycle : this.cycle,decem:this.universDecem()}
    }
    universDecem()
    {
      return Math.floor(this.cycle / 10);
    }
    universDecades()
    {
      return Math.floor(this.universDecem / 10);
    }
    universCentum()
    {
      return Math.floor(this.universDecades / 10);
    }
    universMillennium()
    {
      return Math.floor(this.universCentum / 10);
    }

  }
}

