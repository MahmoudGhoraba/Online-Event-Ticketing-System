const userModel=require('../Models/user');
const eventModel=require('../Models/Event');

const eventController={
    getPostedEvents: async (req,res)=>{
        try{
         const events=await eventModel.find();
         if(!events)
            return res.status(404).json({message:"No Events are found"})
         return res.status(200).json(events);
        }catch(error){
          return res.status(500).json({message:error.message});
        }
    },
    getSingleEvent: async (req,res)=>{
        try{
            const event=await eventModel.findById(req.params.id);
            return res.status(200).json(event);
        }catch(error){
            return res.status(500).json({message:error.message})
        }
    },
    createEvent: async (req,res)=>{

        // chech is this event was already created(no duplication)
        const event=new eventModel({
            title:req.body.title,
            description:req.body.description,
            date:req.body.date,
            location:req.body.location,
            category:req.body.category,
            remainingTickets:req.body.totalNumberOfTickets,
            remainingTickets:req.body.remainingTickets,
            totalNumberOfTickets:req.body.totalNumberOfTickets,
            Organizer:req.user.userId
        });
        try{
            const newEvent= await event.save();
            return res.status(201).json(newEvent);
        }catch(error){
            return res.status(500).json({message:error.message});
        }
    },updateEvent: async (req,res)=>{
        //check for negative maybe dates
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
    },getOrganizerEventAnalytics: async (req,res)=>{
        try{
            const events=await eventModel.findById({Organizer:req.user.userId});
            // i need to check later!!!!!!!!!!11
            if(!events){
                return res.status(400).json({ message: 'No events are found' });          
            }
            const analyticsResult=events.map((event)=>{
                const bookedEvents=event.totalNumberOfTickets-event.remainingTickets;
                const percentageOfTicketsPerEvent=(bookedEvents/event.totalNumberOfTickets)*100;
                return {
                    title:event.title,
                    percentageOfTicketsPerEvent:percentageOfTicketsPerEvent.toFixed(2)
                }
            });
            return res.status(200).json(analyticsResult);
        }catch(error){
            return res.status(500).json({message:error.message});
        }
    }
    ,
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