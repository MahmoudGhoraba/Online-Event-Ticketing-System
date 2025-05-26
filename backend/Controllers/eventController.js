const userModel=require('../Models/user');
const eventModel=require('../Models/Event');

const eventController={
    getPostedEvents: async (req,res)=>{
        try{
         const events=await eventModel.find();
         console.log("in the all");
         if (events.length === 0) {
            return res.status(200).json({ message: "No events were found", events: [] });
        }
         return res.status(200).json({events});
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
        
        try{
            const existingEvent = await eventModel.findOne({
                title: req.body.title,
                Organizer: req.user.userId
            });
    
            if (existingEvent) {
                return res.status(409).json({ message: "Event with this title already exists" });
            }
            const event=new eventModel({
                title:req.body.title,
                description:req.body.description,
                date:req.body.date,
                location:req.body.location,
                category:req.body.category,
                ticketPrice:req.body.ticketPrice,
                remainingTickets:req.body.totalNumberOfTickets,
                totalNumberOfTickets:req.body.totalNumberOfTickets,
                Organizer:req.user.userId,
                image:req.body.image,
            });
            const newEvent= await event.save();
            return res.status(201).json(newEvent);
        }catch(error){
            return res.status(500).json({message:error.message});
        }
    },updateEvent: async (req,res)=>{
        //check for negative maybe dates
        try{
            console.log(req)
            const currentUser= await userModel.findById(req.user.userId)
            const cevent = await eventModel.findById(req.params.id);
            if (!cevent) {
                return res.status(404).json({ message: "Event not found" })
            }
            console.log(req.params.remainingTickets)
            console.log("then total")
            console.log(req.params.totalNumberOfTickets)
            if(currentUser.role ==='Admin'){
                try{
                    const event=await eventModel.findByIdAndUpdate(
                        req.params.id,
                        req.body,
                        {new:true}
                       );
                return res.status(200).json({event,message:"event updated successfully for admin"});
                }catch(err){
                    return res.status(500).json({message:"Sorry admin something went wrong"});
                }
                }
                else if(currentUser.role ==='Organizer'){
                    const hisEvent=await eventModel.findOne({_id:req.params.id,Organizer:currentUser._id,})
                    if(!hisEvent){
                        console.log("this event didnt belong to the user")
                        return res.status(403).json({message:"this event doesnt belong to u"})
                    }
                    console.log(req.body.status ===hisEvent.status)
                    if(req.body.status !==hisEvent.status){
                        return res.status(403).json({message:"As an Organiser you are not allowed to change the event status please redo the changes you want"})
                    }
                    const event=await eventModel.findByIdAndUpdate(
                        req.params.id,
                        req.body,
                        {new:true}
                       );
                       console.log(`after changes`)
                       console.log(event)
                       return res.status(200).json({event,message:"event updated successfully for organiser"});
                }
                return res.status(403).json({ message: "You do not have permission to update events" });
        }catch(error){
            return res.status(500).json({message:error.message})
        }
    },
    deleteEvent: async (req,res)=>{
        try{
            //discuss the changes(amr)suggested
            const currentUser= await userModel.findById(req.user.userId)
            const cevent = await eventModel.findById(req.params.id);
            if (!cevent) {
                return res.status(404).json({ message: "Event not found" })
            }

            if(currentUser.role ==='Admin'){
            try{
          const event= await eventModel.findByIdAndDelete(req.params.id);
          return res.status(200).json({event,message:"event deleted successfully for admin"});
            }catch(err){
                return res.status(500).json({ message: "Server faced an error sorry admin" })
            }
            }
            else if(currentUser.role ==='Organizer'){
                const hisEvent=await eventModel.findOne({_id:req.params.id,Organizer:currentUser._id,})
                if(!hisEvent){
                    console.log("this event didnt belong to the user")
                    return res.status(403).json({message:"this event doesnt belong to u"})
                }
                const event= await eventModel.findByIdAndDelete(req.params.id);
                return res.status(200).json({event,message:"event deleted successfully for organiser"});
            }
            return res.status(403).json({ message: "You do not have permission to update events" });
        }catch (error){
            return res.status(500).json({message:error.message})
        }
    },
    getOrganizerEventAnalytics: async (req,res)=>{
        try{
            const events=await eventModel.find({Organizer:req.user.userId});
            // i need to check later!!!!!!!!!!11
            if (events.length === 0) {
                return res.status(200).json({ message: 'No events found', events: [] });
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
    },
    getApprovedPostedEvents: async (req,res)=>{
        try{
            console.log("in the approved");
         const events=await eventModel.find({status:"approved"});
            if (events.length === 0) {
                return res.status(200).json({ message: "No approved events found", events: [] });
            }
         return res.status(200).json({events});
        }catch(error){
          return res.status(500).json({message:error.message});
        }
    }
};
module.exports=eventController;