const userModel=require('../Models/user');
const eventModel=require('../Models/Event');
const eventController={
    getPostedEvents: async (req,res)=>{
        try{
         const events=await eventModel.find();
         return res.status(200).json(events);
        }catch(error){
          return res.status(500).json({message:error.message});
        }
    },
    createEvent: async (req,res)=>{
        const event=new eventModel({
            title:req.body.title,
            description:req.body.description,
            date:req.body.date,
            location:req.body.location,
            category:req.body.category,
            ticketPrice:req.body.ticketPrice,
            remainingTickets:req.body.remainingTickets,
            totalNumberOfTickets:req.body.totalNumberOfTickets
        });
        try{
            const newEvent= await event.save();
            return res.status(201).json(newEvent);
        }catch(error){
            return res.status(500).json({message:error.message});
        }
    },updateEvent: async (req,res)=>{
        try{
           const event=await eventModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
           );
           return res.status(200).json({event,message:"event updated successfully"});
        }catch(error){
            return res.status(500).json({message:error.message})
        }
    },deleteEvent: async (req,res)=>{
        try{
          const event= await eventModel.findByIdAndDelete(req.params.id);
          return res.status(200).json({event,message:"event deleted successfully"});
        }catch (error){
            return res.status(500).json({message:error.message})
        }
    },
    changeStatusOfEvent: async (req,res)=>{
        try{
          const event =await eventModel.findByIdAndUpdate(
            req.params.id,
            req.body.status,
            {new:true}
          );
          return res.status(200).json({event,message:`Event ${req.body.status} successfully`});
        }catch(error){
            res.status(500).json({message:error.message});
        }
    }
};
module.exports=eventController;